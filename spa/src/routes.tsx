import jwt_decode from "jwt-decode";
import { useAppDispatch } from "./app/hooks";
import isBefore from "date-fns/isBefore";

import { login as reduxLogin, logout, UserBase } from "./user/userSlice";

import { Routes, Route, useLocation, Navigate, useSearchParams, Location } from "react-router-dom";

import { selectUser } from "./user/userSlice";

import { useAppSelector } from "./app/hooks";

import { Login } from "./features/login";

import { DefaultLayout } from "./layout/default.layout";

import { NotFoundPage } from "./features/page_not_found";

import { Home } from "./features/home";
import { ListProjects } from "./features/projects";
import { Profile } from "./features/profile";
import { ProjectForm } from "./features/projects/Form";
import { ProjectView } from "./features/projects/View";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <CheckLogin>
            <Login />
          </CheckLogin>
        }
        path="/login"
      />

      <Route
        element={
          <RequireAuth>
            <DefaultLayout />
          </RequireAuth>
        }
        path="/"
      >
        <Route path="/" element={<Home />}></Route>
        <Route path="/projetos">
          <Route path="" element={<ListProjects />} />
          <Route path="/projetos/form" element={<ProjectForm />} />
          <Route path="/projetos/view/:id" element={<ProjectView />} />
        </Route>
        <Route path="/perfil" element={<Profile />}></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

const CheckLogin = ({ children }: { children: JSX.Element }) => {
  let location: Location = useLocation();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  let [searchParams] = useSearchParams();

  if (user.logado) return <Navigate to={searchParams.get("redirect") || "/"} state={{ from: location }} replace />;

  const buildUpToken = localStorage.getItem(`${process.env.REACT_APP_TOKEN_NAME}`);

  if (buildUpToken) {
    try {
      const decodedJwtToken: any = jwt_decode(buildUpToken);
      const { nome, nivelAcesso, sub, exp } = decodedJwtToken;

      if (!isBefore(new Date(), new Date(exp * 1000))) {
        localStorage.removeItem(`${process.env.REACT_APP_TOKEN_NAME}`);
        dispatch(logout());
      } else {
        dispatch(
          reduxLogin({
            nome,
            nivelAcesso,
            sub,
          })
        );
      }
    } catch (e) {
      localStorage.removeItem(`${process.env.REACT_APP_TOKEN_NAME}`);
      dispatch(logout());
    }
  }

  return children;
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAppSelector(selectUser);
  let location = useLocation();

  if (!user.logado) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />;
  }

  return children;
}
