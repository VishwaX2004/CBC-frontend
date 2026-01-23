const STORAGE_KEY = "admin_activities";
const MAX_ACTIVITIES = 10;

export function logAdminActivity(title, description) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const activity = {
        title,
        description,
        time: new Date().toISOString(),
    };

    const updated = [activity, ...existing].slice(0, MAX_ACTIVITIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getAdminActivities() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
