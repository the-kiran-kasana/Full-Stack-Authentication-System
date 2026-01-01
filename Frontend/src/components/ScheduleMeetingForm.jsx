import react , {useState} from "react"


function ScheduleMeetingForm(){

const [meetingData, setMeetingData] = useState({ title: "", startTime: "",endTime: "", participants: ""});

  return (
  <>
      <input type="text" placeholder="Meeting Title" onChange={(e) => setMeetingData({ ...meetingData, title: e.target.value })}/>
      <input type="text" placeholder="Meeting description" onChange={(e) => setMeetingData({ ...meetingData, title: e.target.value })}/>
      <input type="datetime-local" onChange={(e) => setMeetingData({ ...meetingData, startTime: e.target.value }) } />
      <input type="datetime-local" onChange={(e) => setMeetingData({ ...meetingData, endTime: e.target.value }) }/>
      <input type="text"  placeholder="Emails (comma separated)" onChange={(e) =>setMeetingData({ ...meetingData, participants: e.target.value })  }/>

  </>
  )

}

export default ScheduleMeetingForm;