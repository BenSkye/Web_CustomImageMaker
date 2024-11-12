import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPermissionList } from "@/core/store/user/permissionList";
import userPermissionController from "@/core/services/userPermissonAPI";

const usePermission = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleName = useSelector((state) => state.authentication.roleName);
  const accessToken = useSelector((state) => state.authentication.accessToken);

  React.useEffect(() => {
    if (roleName !== null) {
      try {
        if (accessToken !== null) {
          userPermissionController.getAllUserPermission()
            .then((res) => {
              const permissions = res.find(item => item.roleName === roleName)
              dispatch(setPermissionList({
                syllabusPermission: permissions.syllabusPermission,
                trainingProgramPermission: permissions.trainingProgramPermission,
                classPermission: permissions.classPermission,
                learningMaterialPermission: permissions.learningMaterialPermission,
                userManagementPermission: permissions.userManagementPermission
              }))
            });
        }
      } catch {
        navigate('/login');
      }
    }
  }, [roleName]);
};

export default usePermission;
