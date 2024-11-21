import React, { useState, useEffect } from "react";
import { Modal, Tabs, Form, Button, List, Popconfirm, Input, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import { API_URL } from '../../config/config';
import toast from "react-hot-toast";

const { TabPane } = Tabs;

const NotificationModal = ({ visible, onClose, toEmail }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [drafts, setDrafts] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [excludedEmails, setExcludedEmails] = useState([]);

  useEffect(() => {
    if (visible) {
      if (Array.isArray(toEmail)) {
        // Handle bulk emails
        setSelectedEmails(toEmail);
      } else if (toEmail) {
        // Handle single email
        setSelectedEmails([toEmail]);
      } else {
        // Default case - fetch all emails
        fetchInternEmails();
      }
      fetchDrafts();
      fetchSentMails();
    }
  }, [visible, toEmail]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    // Reset focus state
    document.activeElement.blur();
  };

  const fetchInternEmails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/internList`);
      console.log('Response Data:', response.data);
      
      // Access the nested data array and extract emails
      const emails = response.data.data.map(intern => intern.email);
      console.log('Extracted Emails:', emails);
      setSelectedEmails(emails);
    } catch (error) {
      console.error('Error fetching intern emails:', error);
    }
  };
  
  

  const handleRemoveEmail = (emailToRemove) => {
    setSelectedEmails(prev => prev.filter(email => email !== emailToRemove));
    setExcludedEmails(prev => [...prev, emailToRemove]);
  };

  const handleAddBackEmail = (emailToAdd) => {
    setExcludedEmails(prev => prev.filter(email => email !== emailToAdd));
    setSelectedEmails(prev => [...prev, emailToAdd]);
  };

  const EmailList = () => (
    <div className="mb-4">
      <div className="mb-2">
        <label className="font-medium text-gray-700">To:</label>
        <div className="border p-2 rounded-md min-h-[50px] max-h-40 overflow-y-scroll">
          {selectedEmails.map((email, index) => (
            <Tag 
              key={`${email}-${index}`}
              closable={Array.isArray(selectedEmails) && selectedEmails.length > 1}
              onClose={() => handleRemoveEmail(email)}
              className="m-1"
            >
              {email}
            </Tag>
          ))}
        </div>
      </div>
      
      {excludedEmails.length > 0 && Array.isArray(selectedEmails) && selectedEmails.length > 0 && (
        <div className="mt-4">
          <label className="font-medium text-gray-700">Excluded Emails:</label>
          <div className="border p-2 rounded-md bg-gray-50 max-h-40 overflow-y-scroll">
            {excludedEmails.map((email, index) => (
              <Tag 
                key={`excluded-${email}-${index}`}
                color="warning"
                className="m-1"
              >
                {email}
                <Button 
                  type="link" 
                  size="small" 
                  onClick={() => handleAddBackEmail(email)}
                  className="ml-1"
                >
                  +
                </Button>
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  

  const fetchDrafts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/sendNotification/drafts`);
        setDrafts(response.data.data); // Update to access the data property
    } catch (error) {
        console.error('Error fetching drafts:', error);
    }
  };

  const fetchSentMails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/sendNotification/sent`);
      setSentMails(response.data);
    } catch (error) {
      console.error('Error fetching sent mails:', error);
    }
  };

  const handleSend = async (values) => {
    try {
      const formValues = await form.validateFields();

      const emailString = Array.isArray(selectedEmails) ? selectedEmails.join(', ') : selectedEmails;
      
      const response = await axios.post(`${API_URL}/api/v1/sendNotification/send`, {
        to: emailString,
        subject: formValues.subject,
        body: formValues.body
      });
      
      // Check both success flag and messageId
      if (response.data.success && response.data.messageId) {
        toast.success('Email sent successfully');
        form.resetFields();
        fetchSentMails();
        setActiveTab('3');
      } else {
        throw new Error(response.data.message || 'Failed to send email');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send email';
      console.error('Error details:', error.response?.data);
      toast.error(errorMessage);
    }
  };
  

  // Frontend component
  const handleSaveDraft = async () => {
    try {
        const values = await form.validateFields();
        const response = await axios.post(`${API_URL}/api/v1/sendNotification/draft`, {
            to: selectedEmails.join(','),
            subject: values.subject,
            body: values.body
        });
        
        form.resetFields();
        fetchDrafts();
        setActiveTab('2');
    } catch (error) {
        console.error('Error saving draft:', error);
    }
  };

  const handleDeleteDraft = async (draftId) => {
    try {
      await axios.delete(`${API_URL}/api/v1/sendNotification/draft/${draftId}`);
      fetchDrafts();
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  const loadDraft = (draft) => {
    form.setFieldsValue(draft);
    setActiveTab('1');
  };

  const items = [
    {
      key: '1',
      label: 'New Message',
      children: (
        <div role="tabpanel" tabIndex="0" aria-labelledby="new-message-tab">
          <Form form={form} layout="vertical" onFinish={handleSend}>
            <EmailList />
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Please enter subject' }]}
            >
              <Input placeholder="Enter subject" aria-label="Subject input" />
            </Form.Item>
            <Form.Item
              name="body"
              label="Body"
              rules={[{ required: true, message: 'Please enter message body' }]}
            >
              <Input.TextArea rows={6} placeholder="Enter message" aria-label="Message body input" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                style={{ marginRight: 8 }}
                aria-label="Send message"
              >
                Send
              </Button>
              <Button onClick={handleSaveDraft} aria-label="Save as draft">
                Save as Draft
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Drafts',
      children: (
        <div role="tabpanel" tabIndex="0" aria-labelledby="drafts-tab">
          <List
            dataSource={drafts}
            renderItem={(draft) => (
              <List.Item
                role="listitem"
                tabIndex="0"
                aria-label={`Draft: ${draft.subject}`}
                actions={[
                  <Button 
                    type="link" 
                    onClick={() => loadDraft(draft)}
                    aria-label={`Edit draft: ${draft.subject}`}
                  >
                    Edit
                  </Button>,
                  <Popconfirm
                    title="Delete this draft?"
                    onConfirm={() => handleDeleteDraft(draft._id)}
                    aria-label={`Delete draft: ${draft.subject}`}
                  >
                    <Button type="link" danger>
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={draft.subject}
                  description={moment(draft.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
    {
      key: '3',
      label: 'Sent',
      children: (
        <div role="tabpanel" tabIndex="0" aria-labelledby="sent-tab">
          <List
            dataSource={sentMails}
            renderItem={(mail) => (
              <List.Item
                role="listitem"
                tabIndex="0"
                aria-label={`Sent mail: ${mail.subject}`}
              >
                <List.Item.Meta
                  title={mail.subject}
                  description={moment(mail.sentAt).format('MMMM Do YYYY, h:mm:ss a')}
                />
              </List.Item>
            )}
          />
        </div>
      ),
    },
  ];


  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      title="Send Notification"
    >
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        items={items}
      />
    </Modal>
  );
};
export default NotificationModal;
