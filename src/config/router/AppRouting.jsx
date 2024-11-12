import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { AboutUs } from '@/pages/AboutUs';
import { Dashboard } from '@/pages/Dashboard';
import { UserManagement } from '@/pages/Dashboard/components/UserMangement';
import { UserList } from '@/pages/Dashboard/components/UserMangement/UserList';
import { UserPermission } from '@/pages/Dashboard/components/UserMangement/UserPermission';
import { Syllabus } from '@/pages/Dashboard/components/Syllabus';
import { SyllabusList } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList';
import { SyllabusCreate } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate';
import { TrainingProgramDetail } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail';
import { TrainingProgramList } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList';
import { TrainingProgram } from '@/pages/Dashboard/components/TrainingProgram';
import TrainingProgramCreate from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate';
import { Class } from '@/pages/Dashboard/components/Class';
import { ClassView } from '@/pages/Dashboard/components/Class/components/ClassView';
import { ClassCreate } from '@/pages/Dashboard/components/Class/components/ClassCreate';
import { ClassDetail } from '@/pages/Dashboard/components/Class/components/ClassDetail';
import { ClassUpdate } from '@/pages/Dashboard/components/Class/components/ClassUpdate';
import { ClassSyllabus } from '@/pages/Dashboard/components/Class/components/ClassSyllabus';
import { Calendar } from '@/pages/Dashboard/components/Calendar';
import { LearningMaterial } from '@/pages/Dashboard/components/LearningMaterial';
import { Settings } from '@/pages/Dashboard/components/Settings';
import { Error } from '@/pages/Error';
import { LoginPage } from '@/pages/LoginPage';
import { LoginForm } from '@/pages/LoginPage/components/LoginForm';
import { ResetPasswordForm } from '@/pages/LoginPage/components/ResetPasswordForm';
import { SyllabusDetail } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail';

const AppRouting = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to='/login' />} />
      <Route path="/about-us" element={<AboutUs />} />

      <Route path="/login" element={<LoginPage />}>
        <Route path="" element={<LoginForm />} />
        <Route path="password-reset" element={<ResetPasswordForm />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="material" element={<LearningMaterial />}></Route>
        <Route path="settings" element={<Settings />}></Route>
        <Route path="calendar" element={<Calendar />}></Route>

        <Route path="syllabus" element={<Syllabus />}>
          <Route path="detail" element={<SyllabusList />} />
          <Route path="create" element={<SyllabusCreate />} />
          <Route path="detail/:id" element={<SyllabusDetail />} />
        </Route>

        <Route path="user-management" element={<UserManagement />}>
          <Route path="list" element={<UserList />} />
          <Route path="permission" element={<UserPermission />} />
        </Route>

        <Route path="training-program" element={<TrainingProgram />}>
          <Route path="list" element={<TrainingProgramList />} />
          <Route path=":id" element={<TrainingProgramDetail />} />
          <Route path="create" element={<TrainingProgramCreate />} />
        </Route>

        <Route path="class" element={<Class />}>
          <Route path="detail" element={<ClassView />} />
          <Route path="create" element={<ClassCreate />} />
          <Route path=":id" element={<ClassDetail />} />
          <Route path="edit/:id" element={<ClassUpdate />} />
          <Route path="syllabus/:id" element={<ClassSyllabus />} />
        </Route>
      </Route>

      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default AppRouting;
