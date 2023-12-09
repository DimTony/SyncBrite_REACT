import React from "react";
import { Card } from "react-bootstrap";

const FollowingEvents = ({ events }) => {
  const topEventItems = [
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

  return (
    <>
      {events &&
        topEventItems.map((item, index) => (
          <span key={index} className="righter_events_contents_item_container">
            <Card className="righter_events_contents_item">
              <a href={item.url}>
                <Card.Img variant="top" src="https://placehold.co/400x200" />
                <Card.Body className="righter_events_contents_item_body">
                  <Card.Title>{item.date}</Card.Title>
                  <Card.Text className="righter_events_contents_item_body_info">
                    <span className="actual-price">{item.title}</span>
                    <span className="mrp-price">{item.location} </span>
                    <span className="save-price">
                      {item.interested} • {item.going}
                    </span>
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </span>
        ))}
    </>
  );
};

export default FollowingEvents;
