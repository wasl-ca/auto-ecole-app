/**
 * Returns menu items based on user role.
 */

const menus = {
  admin: [
    { name: "dashboard", path: "/dashboard" },
    { name: "students", path: "/students" },
    { name: "exams", path: "/exams" },
    { name: "manage_users", path: "/users" },
    { name: "settings", path: "/settings" },
  ],
  instructor: [
    { name: "dashboard", path: "/dashboard" },
    { name: "students", path: "/students" },
    { name: "exams", path: "/exams" },
  ],
  student: [
    { name: "dashboard", path: "/dashboard" },
    { name: "lessons", path: "/lessons" },
    { name: "profile", path: "/profile" },
  ],
};

function menuByRole(role) {
  return menus[role] || [];
}

module.exports = menuByRole;
