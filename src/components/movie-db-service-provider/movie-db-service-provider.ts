import React from "react";
import { MDBServiceInterface } from "../../interfaces";

const MDBServiceContext = React.createContext<MDBServiceInterface | null>(null);
export type { MDBServiceInterface };
export { MDBServiceContext };
