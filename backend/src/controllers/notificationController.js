import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    const { accountId } = req.query;
    const filter = accountId ? { accountId } : {};

    const notifications = await Notification.find(filter)
      .populate('accountId', 'username')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    res.json({ message: 'Notificação marcada como lida', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    res.json({ message: 'Notificação removida' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
