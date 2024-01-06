import { useRouter } from "next/router";
import Head from "next/head";
import { Avatar } from "@chatscope/chat-ui-kit-react";
import {
  MainContainer,
  ConversationHeader,
  VoiceCallButton,
  ChatContainer,
  MessageList,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
  SendButton,
  ConversationList,
  Search,
  Conversation,
  Sidebar,
  InputToolbox,
  ExpansionPanel,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Repo } from "@/services/Repo";
import moment from "moment";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default () => {
  const router = useRouter();
  const { Id } = router.query;
  const [getAllConversations, setgetAllConversations] = useState<any>([]);
  const [filteredData, setfilteredData] = useState<any>([]);
  const [chat, setChat] = useState<any>([]);
  const [id, setId] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  console.log(sidebarVisible, "sidebar");
  const [sidebarStyle, setSidebarStyle] = useState({});
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [conversationContentStyle, setConversationContentStyle] = useState({});
  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [name, setName] = useState<any>("");
  const [dp, setdp] = useState<any>(
    "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
  );

  useEffect(() => {
    (async () => {
      const data = await Repo.getAllConversations();
      setgetAllConversations(data);

      if (Id) {
        const filterdata = data?.filter((item: any) => item?.id == Id);

        selectHandler({ id: Id, messageable: filterdata[0]?.messageable });
        return;
      }

      selectHandler({ id: data[0]?.id, messageable: data[0]?.messageable });
    })();
  }, [Id]);

  const [messageInputValue, setMessageInputValue] = useState<any>("");

  const sendHandler = async () => {
    const sendMessage = await Repo?.sendMessage(id, messageInputValue);
    setMessageInputValue("");

    setChat((pre: any) => [
      ...pre,
      {
        message: sendMessage?.data?.body,
        sentTime: "15 mins ago",
        sender: "Patrik",
        direction: "outgoing",
        position: "first",
      },
    ]);
  };

  const selectHandler = ({ id, messageable }: any) => {
    // console.log(id, messageable, "msg");
  
    const token = localStorage.getItem("token");
    setId(id);
    setdp(messageable?.dp);
    setName(messageable?.firstname);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getConversation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response?.data?.data?.data, "before override");
        const dd = response?.data?.data?.data?.reverse()?.map((item: any) => ({
          message: item?.body,
          sentTime: "15 mins ago",
          sender: item?.sender?.name,
          sendTime: moment(item?.created_at).format("MMMM Do , h:mm a"),
          dp: item?.sender?.dp,
          direction:
            item?.sender?.firstname == localStorage.getItem("name")
              ? "outgoing"
              : "incoming",
          position: "single",
        }));
        setChat([...dd]);
        setIsLoading(false);
        // console.log(response?.data?.data?.data, "override chat ");
      })
      .catch((error) => {
        console.log(error);
      });
      if (sidebarVisible) {
        setSidebarVisible(!sidebarVisible);
      }
  };

  const onChangeHandler = (e: any) => {
    if (e.target.value === "") {
      if (filteredData) {
        setfilteredData([]);
      }
      return;
    }
    const regexPattern = new RegExp(e.target.value, "i");
    const filteredDat = getAllConversations.filter((item: any) =>
      regexPattern.test(item?.messageable?.firstname)
    );
    setfilteredData([...filteredDat]);
  };
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  useEffect(() => {
    if (sidebarVisible) {
      
    
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "100%",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);

  return (
    <>
      <Head>
        {" "}
        <title>Chat</title>
      </Head>
      <div className=" mx-auto p-4 mt-5 md:px-28 container">
        <Breadcrumbs aria-label="breadcrumb">
          <div className=" text-xcool-new-blue font-bold">
            <Link href="/" className="flex items-center">
              <span>
                <AiFillHome fontSize="inherit" />
              </span>

              <span className="mx-1"> HOME</span>
            </Link>
          </div>

          <div className=" text-xcool-new-blue font-bold">
            <div className="flex items-center">
              <Link
                href={`/account/dashboards/batches`}
                className="flex items-center"
              >
                <span className="mx-1 uppercase"> Dashboard</span>
              </Link>
            </div>
          </div>
          <div className=" text-xcool-new-blue font-bold">
            <div className="flex items-center">
              <span className="mx-1 uppercase"> Chat</span>
            </div>
          </div>
          {/* 
            <div className="text-white">
              <Typography>Chat</Typography>
            </div> */}
        </Breadcrumbs>
        {/* <Avatar src={'https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png'} name={"Zoe"} status="available" /> */}
        <div
          // className=" md:block hidden"
          style={{
            height: "600px",
            position: "relative",
          }}
        >
          <MainContainer responsive>
            <Sidebar
              position="left"
              scrollable={false}
              className="md:w-auto min-w-fit "
              style={sidebarStyle}
            >
              <Input
                type="search"
                className="my-5 mx-4"
                placeholder="Search..."
                onChange={onChangeHandler}
              />

              {isLoading === false &&
                (getAllConversations.length > 0 || filteredData.length > 0 ? (
                  <ConversationList>
                    {(filteredData.length > 0
                      ? filteredData
                      : getAllConversations
                    )?.map((item: any, index: any) => {
                      return (
                        <>
                          {item?.messageable && (
                            <>
                            <div  onClick={() => selectHandler(item)} className="flex gap-3 my-3 mx-2 cursor-pointer items-center">
                            <Avatar
                                src={
                                  item?.messageable?.dp ||
                                  "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                                }
                                name={item?.messageable?.firstname}
                                // status={
                                //   item?.status === "active" ? "available" : "dnd"
                                // }
                                style={conversationAvatarStyle}
                              />
                              <div> {item?.messageable?.firstname}</div>
                             
                              </div>

                            {/* <Conversation
                              onClick={() => selectHandler(item)}
                              key={index}
                              name={item?.messageable?.firstname}
                              // lastSenderName={"("+item?.messageable.firstname+")"}
                              info={"(" + item?.messageable?.firstname + ")"}
                              // active={item?.status === "active" ? true : false}
                              // active={(item.id == Id ? true : false)}
                            >
                              <Avatar
                                src={
                                  item?.messageable?.dp ||
                                  "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                                }
                                name={item?.messageable?.firstname}
                                // status={
                                //   item?.status === "active" ? "available" : "dnd"
                                // }
                                style={conversationAvatarStyle}
                              />
                              <p>tt</p>
                            </Conversation> */}
                            </>
                          )}
                        </>
                      );
                    })}
                  </ConversationList>
                ) : (
                  <ConversationList>No teacher available</ConversationList>
                ))}
            </Sidebar>

            <ChatContainer style={chatContainerStyle} className={`md:block`}>
              <ConversationHeader>
                <ConversationHeader.Back onClick={handleBackClick} />
                <Avatar src={dp} name={name} />
                <ConversationHeader.Content
                  userName={name}
                  // info="Active 10 mins ago"
                />
              </ConversationHeader>

              <MessageList>
                {/* <MessageSeparator 
                content="Saturday, 30 November 2019"
                 /> */}
                {!chat.length ? (
                  <MessageList.Content
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                      fontSize: "1.2em",
                    }}
                  >
                    Let's start conversation
                  </MessageList.Content>
                ) : (
                  <>
                    {chat?.map((i: any, index: any) => {
                      return (
                        <Message model={i} key={index}>
                          <Avatar
                            src={
                              i?.dp ||
                              "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                            }
                            name={i?.sender}
                          />
                          <Message.Footer sentTime={i?.sendTime} />
                        </Message>
                      );
                    })}
                  </>
                )}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                value={messageInputValue}
                onChange={(val) => setMessageInputValue(val)}
                onSend={sendHandler}
                sendButton={true}
                attachButton={false}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
};
