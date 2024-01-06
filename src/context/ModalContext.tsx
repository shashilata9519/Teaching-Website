import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext({});

export function ModalProvider({ children }: any) {
  const [isModalOpen, setModalOpen] = useState<any>(false);
  const [bookNowModal,setBookNowModal]=useState(false)
  const [linkupdatemodal, setlinkupdatemodal] = useState({
    isOpen: false,
    type: null,
  });
  const [modalData, setModalData] = useState<any>({
    Courses: "",
    Fees: "",
    Genre: "Hindustani-Classical-Vocals",
    Teachers: "",
    Timeslot: "",
  });

  const [modalType, setModalType] = useState<any>("");
  const [filter, setFilter] = useState<any>({
    subcategory: "Hindustani-Classical-Vocals",
  });
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab, "activetab");

  return (
    <ModalContext.Provider
      value={{
        setlinkupdatemodal,
        linkupdatemodal,
        isModalOpen,
        setModalOpen,
        modalData,
        setModalData,
        filter,
        setFilter,
        modalType,
        setModalType,
        activeTab,
        setActiveTab,
        bookNowModal,
        setBookNowModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
