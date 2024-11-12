export const PublishStatus = {
  PUBLISHED: 1,
  DEACTIVATED: 2,
  DRAFT: 3,
};

// Sử dụng Object.freeze để ngăn chặn việc thay đổi giá trị của Enum
Object.freeze(PublishStatus);
