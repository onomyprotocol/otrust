import React, { useState, createContext, useContext } from 'react'

export const ModalContext = createContext()
export const useModal = () => useContext(ModalContext)

export const UpdateModalContext = createContext()
export const useUpdateModal = () => useContext(UpdateModalContext)

function ModalProvider({ children }) {
    const [approveModal, setApproveModal] = useState(false);
    const [completedModal, setCompletedModal] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [failedModal, setFailedModal] = useState(null);
    const [pendingModal, setPendingModal] = useState(false);

    const contextValue = {
        approveModal,
        completedModal,
        confirmModal,
        failedModal,
        pendingModal
    }

    const updateValue = {
        setApproveModal,
        setCompletedModal,
        setConfirmModal,
        setFailedModal,
        setPendingModal
    }

    return (
        <UpdateModalContext.Provider value={updateValue}>
            <ModalContext.Provider value={contextValue} >
                {children}
            </ModalContext.Provider>
        </UpdateModalContext.Provider>
    )
}

export default ModalProvider