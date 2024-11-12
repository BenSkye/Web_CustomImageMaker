import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const permissionList = [
  { name: 'Full access', num: 1 },
  { name: 'Create', num: 2 },
  { name: 'Modify', num: 3 },
  { name: 'View', num: 4 },
  { name: 'Access denied', num: 5 },
];

const useAuthorization = (permissions) => {
  const [isAccessible, setIsAccessible] = useState({
    view: false,
    create: false,
    modify: false,
    fullAccess: false,
    denied: false,
  });

  // Decode roleName đã mã hóa
  useEffect(() => {
    const permissionName = permissionList[permissions - 1].name;

    if (permissionName === 'Full access') {
      setIsAccessible({
        view: true,
        create: true,
        modify: true,
        fullAccess: true,
        denied: false,
      });
    } else if (permissionName === 'View') {
      setIsAccessible({
        view: true,
        create: false,
        modify: false,
        fullAccess: false,
        denied: false,
      });
    } else if (permissionName === 'Create') {
      setIsAccessible({
        view: true,
        create: true,
        modify: true,
        fullAccess: false,
        denied: false,
      });
    } else if (permissionName === 'Modify') {
      setIsAccessible({
        view: true,
        create: false,
        modify: true,
        fullAccess: false,
        denied: false,
      });
    } else {
      setIsAccessible({
        view: false,
        create: false,
        modify: false,
        fullAccess: false,
        denied: true,
      });
    }
  }, [permissions]);
  return { isAccessible };
};

export default useAuthorization;
