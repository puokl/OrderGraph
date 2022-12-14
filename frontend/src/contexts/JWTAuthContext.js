import { createContext, useEffect, useReducer } from "react";
import axios from "src/utils/axios2";
import PropTypes from "prop-types";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  hasOrg: false,
  user: null,
  role: "",
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, hasOrg, role } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      hasOrg,
      user,
      role,
    };
  },
  LOGIN: (state, action) => {
    const { user, hasOrg } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      hasOrg,
      user,
      role: user.role,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      hasOrg: false,
      user,
      role: user.role,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get("/api/v1/auth/me");
          const user = response.data.data;

          if (user.organization === "") {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                hasOrg: false,
                user,
                role: user.role,
              },
            });
          } else if (user) {
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                hasOrg: true,
                user,
                role: user.role,
              },
            });
          }
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              role: "",
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            role: "",
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/api/v1/auth/login", {
      email,
      password,
    });

    const accessToken = response.data.accessToken;
    const user = response.data.data;

    setSession(accessToken);
    if (user.organization === "") {
      dispatch({
        type: "LOGIN",
        payload: {
          hasOrg: false,
          user,
          role: user.role,
        },
      });
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          hasOrg: true,
          user,
          role: user.role,
        },
      });
    }

    return response.data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const register = async (email, password) => {
    const response = await axios.post("/api/v1/auth/register", {
      email,
      password,
    });
    const accessToken = response.data.accessToken;
    const user = response.data.data;
    setSession(accessToken);

    // window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        hasOrg: false,
        user,
        role: user.role,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
