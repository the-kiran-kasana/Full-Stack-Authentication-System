import { Calendar, Mic, CheckCircle, Clock } from "lucide-react";
import  react ,{ useState } from "react"
import axios from "axios";
import {Link} from "react-router-dom";
export default function UserDashboard() {

  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
   };

   const handleUpload = async () => {
       if (!file) {  alert("Please select an audio file");  return;  }

       const formData = new FormData();
       formData.append("audio", file); // must match multer key

       try {
         setLoading(true);
         const res = await axios.post( "http://localhost:5050/meeting/upload-audio", formData );
         setTranscript(res.data.transcript);
       } catch (err) {
         console.error(err);
         alert("Upload failed");
       } finally {
         setLoading(false);
       }
     };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Smart Meeting Assistant Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Mic className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Meetings Recorded</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Tasks Created</p>
            <p className="text-xl font-semibold">34</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Calendar className="h-8 w-8 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Calendar Events</p>
            <p className="text-xl font-semibold">18</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
          <Clock className="h-8 w-8 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Hours Saved</p>
            <p className="text-xl font-semibold">9.5</p>
          </div>
        </div>
      </div>

      {/* Recent Meetings */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Meetings</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Product Sync Meeting</span>
            <span className="text-sm text-gray-500">Summary Generated</span>
          </li>
          <li className="flex justify-between">
            <span>UI Review Call</span>
            <span className="text-sm text-gray-500">3 Tasks Created</span>
          </li>
          <li className="flex justify-between">
            <span>Client Follow-up</span>
            <span className="text-sm text-gray-500">Event Scheduled</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-8">



        <button className="px-5 py-2 bg-white rounded-lg hover:bg-purple-200" >
           <Link to="https://calendar.google.com/calendar">View Calendar</Link>
        </button>

        <button className="px-5 py-2 bg-white rounded-lg hover:bg-purple-200">All</button>

        <button className="px-5 py-2 bg-white rounded-lg hover:bg-purple-200">Upcoming Meeting</button>

        <button className="px-5 py-2 bg-white rounded-lg hover:bg-purple-200">Summarize</button>

        <button className="px-5 py-2 bg-white rounded-lg hover:bg-purple-200">AI Chat</button>




              <h3>📝 Transcript</h3>
              <h3>📝 video</h3>


      </div>


          <pre className="bg-gray-100 rounded-xl shadow p-1 mb-8">{transcript}</pre>


    </div>
  );
}
