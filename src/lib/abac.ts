// Attribute-Based Access Control (ABAC) implementation

// Define resource types
export type Resource =
  | "dashboard"
  | "courses"
  | "students"
  | "faculty"
  | "grades"
  | "analytics"
  | "settings"
  | "calendar"

// Define action types
export type Action = "view" | "create" | "update" | "delete" | "approve" | "reject"

// Define user roles
export type Role = "ADMIN" | "FACULTY" | "STUDENT" | "GUEST"

// Define user attributes
export interface UserAttributes {
  id: string
  role: Role
  department?: string
  isActive: boolean
}

// Define resource attributes
export interface ResourceAttributes {
  type: Resource
  ownerId?: string
  departmentId?: string
  isPublic?: boolean
}

// Define environment attributes
export interface EnvironmentAttributes {
  time?: Date
  ipAddress?: string
}

// Define policy rule
export interface PolicyRule {
  resource: Resource
  action: Action
  roles: Role[]
  condition?: (user: UserAttributes, resource: ResourceAttributes, environment: EnvironmentAttributes) => boolean
}

// Define policy rules
export const policyRules: PolicyRule[] = [
  // Admin has full access to everything
  {
    resource: "dashboard",
    action: "view",
    roles: ["ADMIN", "FACULTY", "STUDENT", "GUEST"],
  },
  {
    resource: "courses",
    action: "view",
    roles: ["ADMIN", "FACULTY", "STUDENT"],
  },
  {
    resource: "courses",
    action: "create",
    roles: ["ADMIN"],
  },
  {
    resource: "courses",
    action: "update",
    roles: ["ADMIN", "FACULTY"],
    condition: (user, resource) =>
      user.role === "ADMIN" || (user.role === "FACULTY" && user.department === resource.departmentId),
  },
  {
    resource: "students",
    action: "view",
    roles: ["ADMIN", "FACULTY"],
  },
  {
    resource: "faculty",
    action: "view",
    roles: ["ADMIN"],
  },
  {
    resource: "grades",
    action: "view",
    roles: ["ADMIN", "FACULTY", "STUDENT"],
    condition: (user, resource) =>
      user.role === "ADMIN" || user.role === "FACULTY" || (user.role === "STUDENT" && user.id === resource.ownerId),
  },
  {
    resource: "grades",
    action: "update",
    roles: ["ADMIN", "FACULTY"],
    condition: (user, resource) =>
      user.role === "ADMIN" || (user.role === "FACULTY" && user.department === resource.departmentId),
  },
  {
    resource: "analytics",
    action: "view",
    roles: ["ADMIN"],
  },
  {
    resource: "settings",
    action: "view",
    roles: ["ADMIN", "FACULTY", "STUDENT"],
  },
  {
    resource: "settings",
    action: "update",
    roles: ["ADMIN"],
  },
  {
    resource: "calendar",
    action: "view",
    roles: ["ADMIN", "FACULTY", "STUDENT"],
  },
]

// Check if user has permission to perform action on resource
export function checkPermission(
  user: UserAttributes,
  resource: ResourceAttributes,
  action: Action,
  environment: EnvironmentAttributes = {},
): boolean {
  // Find matching policy rules
  const matchingRules = policyRules.filter(
    (rule) => rule.resource === resource.type && rule.action === action && rule.roles.includes(user.role),
  )

  // If no matching rules, deny access
  if (matchingRules.length === 0) {
    return false
  }

  // Check if any rule's condition is satisfied
  return matchingRules.some((rule) => {
    // If no condition, allow access
    if (!rule.condition) {
      return true
    }

    // Check condition
    return rule.condition(user, resource, environment)
  })
}

// Helper function to get user attributes from role string
export function getUserFromRole(role: string | null): UserAttributes {
  switch (role) {
    case "admin":
      return {
        id: "admin-1",
        role: "ADMIN",
        isActive: true,
      }
    case "faculty":
      return {
        id: "faculty-1",
        role: "FACULTY",
        department: "Computer Science",
        isActive: true,
      }
    case "student":
      return {
        id: "student-1",
        role: "STUDENT",
        department: "Computer Science",
        isActive: true,
      }
    default:
      return {
        id: "guest-1",
        role: "GUEST",
        isActive: true,
      }
  }
}
