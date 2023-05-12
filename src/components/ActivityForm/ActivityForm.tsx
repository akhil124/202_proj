import React, { useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import { TimePicker } from "@atlaskit/datetime-picker";
import SelectInput from "../../common/Select";
import LocationInput from "../../common/LocationInput";
import useApi from "../../hooks/useApi";
import { MDBInput } from "mdb-react-ui-kit";
import Button from "@atlaskit/button/standard-button";
import { createActivity } from "../../services/activityService";
import AlertDismiss from "../../common/Alert";

const ActivityForm = ({ create = false }) => {
  const [location, setLocation] = React.useState("hyderabad");
  const [activity, setActivity] = React.useState("cricket");
  const [slot, setSlot] = React.useState("00:00");
  const [capacity, setCapacity] = React.useState(0);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const { response } = useApi("/activities", "get");
  const activityList = useMemo(() => response?.data, [response]);

  const onLocationChange = (location) => {
    const val = location.value;
    setLocation(val);
  };

  const convertToOptions = (activityList) =>
    activityList?.map((activity) => ({
      value: activity?.name,
      label: activity?.name,
    }));

  //conert HH:mm to HHmm
  const convertToTime = (time) => {
    const [hour, minute] = time.split(":");
    return hour + minute;
  };
  const handleSubmit = async () => {
    try {
      const data = {
        activityName: activity,
        location,
        slot: { start_time: convertToTime(slot), capacity: capacity },
      };
      const res = await createActivity(data);
      if (res) {
        setSuccess("Activity created successfully");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };

  return (
    <Container>
      <Row className="my-3">
        {create ? (
          <MDBInput
            name="activity"
            value={activity}
            wrapperClass="mb-4"
            label="Activity name"
            id="activity-register"
            type="text"
            onChange={(e) => setActivity(e.target.value)}
          />
        ) : (
          <SelectInput
            options={convertToOptions(activityList)}
            onChange={(val) => setActivity(val?.value)}
            placeholder="Select Activity"
          />
        )}
      </Row>
      <Row className="my-3">
        <LocationInput onChange={onLocationChange} />
      </Row>
      <Row className="my-3">
        <TimePicker
          timeFormat="HH:mm"
          placeholder="13:00"
          timeIsEditable
          onChange={setSlot}
        />
      </Row>
      <Row className="my-3">
        <MDBInput
          name="capacity"
          value={capacity}
          wrapperClass="mb-4"
          label="Capacity"
          id="capacity-register"
          type="number"
          onChange={(e) => setCapacity(parseInt(e.target.value))}
        />
      </Row>
      <Row className="my-3">
        <Button appearance="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Row>
      {error && (
        <AlertDismiss message={error} setError={setError} variant="danger" />
      )}
      {success && (
        <AlertDismiss
          message={`Activity ${create ? "created" : "updated"}`}
          setError={setSuccess}
        />
      )}
    </Container>
  );
};

export default ActivityForm;
