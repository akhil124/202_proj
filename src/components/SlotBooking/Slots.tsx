import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import SlotChip from "./SlotChip";
import COLOR from "../../constants/colors";
import { useAuth } from "../../hooks/useAuth";
import { bookSlot } from "../../services/slotServices";
import AlertDismiss from "../../common/Alert";

const Slots = ({ date, activity, location }) => {
  const [slotList, setSlotList] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const { user } = useAuth();

  const sortSlots = (slots: any) => {
    slots?.slots?.sort((a, b) => {
      return a.start_time - b.start_time;
    });
    return slots;
  };
  const handleClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("Please login to book a slot");
    } else {
      try {
        const res = await bookSlot(selectedSlot.id, user?._id, date, activity);
        if (res) {
          setSucess("Slot booked successfully");
        }
      } catch {
        setError("Something went wrong");
      }
    }
  };

  const isSelected = (slot) => {
    if (user) {
      return slot?.users?.includes(user?._id);
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `/activities/${activity}/location/${location}/slots`,
          {
            date,
          }
        );
        if (response?.data?.data) {
          setSlotList(() => sortSlots(response.data.data));
        }
      } catch {
        setError("Something went wrong");
      }
      setLoading(false);
    })();
  }, [date, activity, location, sucess]);

  return (
    <Container fluid="none">
      {error && <AlertDismiss message={error} setError={setError} />}
      {sucess && (
        <AlertDismiss message={sucess} setError={setSucess} variant="success" />
      )}
      {loading ? (
        <Row className="justify-content-center">
          <div className="my-5 spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        </Row>
      ) : (
        <Row className="my-4 p-0">
          {slotList?.slots?.map((slot) => (
            <Col className="mb-3" key={slot.id}>
              <SlotChip
                time={slot.start_time}
                handleClick={() => handleClick(slot)}
                available={slot.available}
                active={selectedSlot === slot}
                selected={isSelected(slot)}
              ></SlotChip>
            </Col>
          ))}
        </Row>
      )}
      <Row>
        <Button
          className={`px-5 py-2 ${selectedSlot ? "" : "disabled"}`}
          style={{
            background: COLOR.PEACH,
            border: "none",
            fontSize: "14px",
            boxShadow: "none",
            transition: "all 0.3s ease",
          }}
          onClick={handleSubmit}
        >
          Select Slot
        </Button>
      </Row>
    </Container>
  );
};

export default Slots;
