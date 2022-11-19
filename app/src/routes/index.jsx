import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Register,
  Home,
  RegisterPet,
  Pet,
  Institution,
  Profile,
} from "../ui/screens";
import { Private, Unauthorized, Guest } from "../ui/components"
  
const ROLES = {
  'User': 'ROLE_USER',
  'Institution': 'ROLE_INSTITUTION',
  'Editor': 'ROLE_MODERATOR',
  'Admin': 'ROLE_ADMIN'
}

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Guest><Login/></Guest>} />
      <Route path="/registrar" element={<Guest><Register/></Guest>} />
      <Route path="/unauthorized" element={<Guest><Unauthorized/></Guest>} />

      <Route path="/" element={<Private allowedRoles={[ROLES.User]}><Home/></Private>}/>
      <Route path="/perfil" element={<Private allowedRoles={[ROLES.User]}><Profile/></Private>}/>
      <Route path="/registrar-pet" element={<Private allowedRoles={[ROLES.User]}><RegisterPet/></Private>}/>
      <Route path="/pet/:idPet" element={<Private allowedRoles={[ROLES.User]}><Pet/></Private>}/>
      <Route path="/instituicao/:idInstitution" element={<Private allowedRoles={[ROLES.User]}><Institution/></Private>}/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
