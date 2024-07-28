import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
export const ProviderContext = createContext();
export default function Provider({ children, store }) {
  const { initialState, rootReducer } = store;
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
