import React, { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import {
  FaRegCalendarPlus,
  FaRegHeart,
  FaRegCommentDots,
} from "react-icons/fa";
import EventSlider from "../../Slider/EventSlider";
import placeholderIcon from "../../../../../images/placeholder.png";
import MainTopEvents from "./Events/MainTopEvents";
import TopDeals from "../../../../Test/TopDeals";
import CreateEventModal from "../../../Events/Modals/CreateEvent/CreateEventModal";
import AddEventBanner from "../../../Events/Modals/EventBannerImage/AddEventBanner";
import CustomEventRepeat from "../../../Events/Modals/CustomEventRepeat/CustomEventRepeat";

const CenterTop = ({ userData }) => {
  const [data, setData] = useState({
    eventName: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    details: "",
    eventLocation: "",
    link: "",
    visibility: "",
    visibilityGroup: "",
    eventType: "",
    selectedGroups: [],
    coHostEmail: "",
    repeatType: "",
    repeatDate: "",
    repeatTime: "",
    customDates: [],
    bannerImage: "",
  });
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleEventCreator = () => {
    setIsModalOpen(!isModalOpen);
    setCurrentStep(1);
  };

  const topDealsItems = [
    {
      title: "CHARISMATA CONFERENCE 2023!!!",
      date: "FRIDAY, DECEMBER 8, 2023 AT 4 AM UTC+01",
      location: "Hamburg",
      url: "/attendee/dashboard",
      interested: 123,
      going: 45,
    },
    {
      title: "TONGUES AND SONGS 5",
      date: "WEDNESDAY, JANUARY 17, 2024 AT 4 AM UTC+01",
      location: "Minsk, the municipality",
      url: "/attendee/dashboard",
      interested: 678,
      going: 910,
    },
    {
      title: "Rehoboth 2023",
      date: "MONDAY, FEBRUARY 26, 2024 AT 4 AM UTC+01",
      location: "Gomel Region",
      url: "/attendee/dashboard",
      interested: 1112,
      going: 13,
    },
    {
      title: "Hotel Danag",
      date: "SUNDAY, APRIL 7, 2024 AT 4 AM UTC+01",
      location: "Santiago de Cuba",
      url: "/attendee/dashboard",
      interested: 1415,
      going: 16,
    },
    {
      title: "MEET YOUR MATCH 2023(MYM)",
      date: "SATURDAY, MAY 18, 2024 AT 4 AM UTC+01",
      location: "Munich (München)",
      url: "/attendee/dashboard",
      interested: 1718,
      going: 19,
    },
    {
      title: "FEAST OF MIRACLE 2023",
      date: "FRIDAY, JUNE 28, 2024 AT 4 AM UTC+01",
      location: "Cologne (Köln)",
      interested: 2021,
      going: 22,
    },
    {
      title: "Christmas Carol Concert",
      date: "WEDNESDAY, AUGUST 7, 2024 AT 4 AM UTC+01",
      location: "North Rhine-Westphalia",
      interested: 2324,
      going: 25,
    },
    {
      title: "Tontex Garden Centre",
      date: "TUESDAY, SEPTEMBER 17, 2024 AT 4 AM UTC+01",
      location: "Bavaria",
      interested: 2627,
      going: 28,
    },
    // Add more items as needed
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBanner = () => {
    setCurrentStep(3);
  };

  const handleToOne = () => {
    setCurrentStep(1);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  return (
    <>
      <div className="center_top">
        <EventSlider>
          <Card className="create_card">
            <div
              onClick={toggleEventCreator}
              className="create_card_create_event"
            >
              <Card.Img
                variant="top"
                src={userData ? userData.profilePic : placeholderIcon}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />

              <Card.Body className="create_card_body">
                <Card.Title className="create_card_body_title">
                  Create Event
                </Card.Title>
                <Card.Text>
                  <FaRegCalendarPlus size={30} />
                </Card.Text>
              </Card.Body>
            </div>
          </Card>

          <MainTopEvents />
        </EventSlider>
        {isModalOpen && (
          <div className="create_event_modal1_overlay">
            <div className="create_event_modal1_content" ref={modalRef}>
              {currentStep === 1 && (
                <CreateEventModal
                  user={userData}
                  setCreateEventModal={setIsModalOpen}
                  onNext={handleNext}
                  onBanner={handleBanner}
                  onClose={handleClose}
                  currentStep={currentStep}
                  data={data}
                  setData={setData}
                  bannerImageURL={bannerImageURL}
                />
              )}

              {currentStep === 2 && (
                <CustomEventRepeat
                  data={data}
                  setData={setData}
                  toOne={handleToOne}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <AddEventBanner
                  data={data}
                  setData={setData}
                  toOne={handleToOne}
                  bannerImageURL={bannerImageURL}
                  setBannerImageURL={setBannerImageURL}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CenterTop;
