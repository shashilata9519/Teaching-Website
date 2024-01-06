import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Fragment } from "react";

export const ModalBase = ({ isOpen, closeModal, modalState,title,children,className }: any) => {


  if (!modalState?.isOpen) return null;

  return (
    <Transition appear show={modalState?.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={`fixed inset-0 flex  justify-center  p-4 ${className}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-fit max-h-[90vh] overflow-y-auto  transform rounded-2xl md:p-6 p-2 text-left align-middle shadow-xl transition-all"
              style={{ background:'white' }}>
                <div
                  
                  className="flex justify-end  cursor-pointer"
                  onClick={closeModal}
                >
                  <AiFillCloseCircle size={'20'} />
                </div>

                <Dialog.Title
                  as="h3"
                  className=" text-center  text-2xl font-bold leading-6 pt-5"
                >
                  {title}
                  {/* Title */}
                </Dialog.Title>
                {children}
                {/* Child */}
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
