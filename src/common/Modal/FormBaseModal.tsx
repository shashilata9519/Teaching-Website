import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Fragment } from "react";

export const FormModalBase = ({
  isOpen,
  closeModal,
  modalState,
  title,
  children,
}: any) => {
  const handler = () => {
    closeModal({
      isOpen: false,
      type: null,
    });
  };

  if (!modalState?.isOpen) return null;

  return (
    <Transition appear show={modalState?.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true">
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex  justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className=" h-fit w-full max-w-lg transform rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                    style={{
                      background:
                        "radial-gradient(82.02% 165.7% at 84.7% 19.94%, #fceae9 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(131.24% 131.24% at 50% 126.11%, #fff5e6 46.84%, rgba(255, 255, 255, 0) 100%), radial-gradient(90.67% 153.58% at 6.71% 8.78%, #e8fafc 19.39%, rgba(255, 255, 255, 0) 100%), #ffffff",
                    }}
                  >
                    <div
                      className="flex justify-end  cursor-pointer"
                      onClick={handler}
                    >
                      <AiFillCloseCircle size={"20"} />
                    </div>

                    <Dialog.Title
                      as="h3"
                      className=" text-center  text-2xl font-bold leading-6 text-gray-900 pt-5"
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
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
