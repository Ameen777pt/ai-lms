import EmptyState from "../ui/EmptyState";
type NotificationListProps = {
  notifications: string[];
};

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-8">
        Notifications
      </h2>

      {notifications.length === 0 && (
        <EmptyState message="No notifications yet." />
      )}

      {[...new Set(notifications)].map(
        (notification, index) => (
          <div
            key={index}
            className="bg-amber-100 text-black border border-amber-300 rounded-lg p-4 mt-4"
          >
            🔔 {notification}
          </div>
        )
      )}
    </>
  );
}