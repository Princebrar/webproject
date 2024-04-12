import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./Components/User/_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Music Player",
};

 
const Layout = ({ children }) => {
  return (<html>
    <AuthContextProvider><body className={inter.className}>{children}</body></AuthContextProvider>
  </html>
  );
};
 
export default Layout;
