import { Calendar, Mic, CheckCircle, Clock } from "lucide-react";
import  react ,{ useState } from "react"
import axios from "axios";
import {Link} from "react-router-dom";
export default function SmartMeetingDashboard() {

  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [videos, setVideos] = useState([]);

  const [audioLoading, setAudioLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);


   const handleFileChange = (e) => {
   console.log(e.target.files[0])
      setFile(e.target.files[0]);
   };

  const handleVideosChange = (e) => {
     console.log(e.target.files[0])
    setVideoFile(e.target.files[0]);
  };



   const handleUpload = async () => {
     if (!file) return alert("Please select an audio file");

     const formData = new FormData();
     formData.append("audio", file);

     try {
       setAudioLoading(true);
       const res = await axios.post(
         "http://localhost:5050/meeting/upload-audio",
         formData
       );
       setTranscript(res.data.transcript);
     } catch (err) {
       alert("Audio upload failed");
     } finally {
       setAudioLoading(false);
     }
   };



    const uploadVideo = async () => {
      if (!videoFile) return alert("Please select a video");

      const formData = new FormData();
      formData.append("video", videoFile);

      try {
        setVideoLoading(true);
        const res = await axios.post(
          "http://localhost:5050/meeting/upload-videos",
          formData
        );

        // assuming backend returns uploaded video object
        setVideos(prev => [...prev, res.data]);

      } catch (err) {
        alert("Video upload failed");
      } finally {
        setVideoLoading(false);
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


       <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-800 w-fit">
         Choose Audio
         <input type="file" accept="audio/*" onChange={handleFileChange}  className="hidden"/>
       </label>

       <button
         onClick={handleUpload}
         disabled={audioLoading}
         className={`px-4 py-2 rounded-lg text-white ${
           audioLoading
             ? "bg-gray-400 cursor-not-allowed"
             : "bg-blue-600 hover:bg-blue-700"
         }`}
       >
         {audioLoading ? "Processing..." : "Upload & Transcribe"}
       </button>


        <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100" >
           <Link to="https://calendar.google.com/calendar">View Calendar</Link>
        </button>

        <button className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100" >
              <Link to="https://calendar.google.com/calendar">Create Meeting</Link>
        </button>

<button
  onClick={uploadVideo}
  disabled={videoLoading}
  className={`px-4 py-2 rounded-lg text-white ${
    videoLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {videoLoading ? "Uploading..." : "Upload Video"}
</button>

<button className="px-1 py-2 bg-pink-500 text-white rounded-lg cursor-pointer hover:bg-gray-800 w-fit"> + Create Meeting</button>

<label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-800 w-fit">
  Upload Meeting Video
  <input
    type="file"
    accept="video/*"
    onChange={handleVideosChange}
    className="hidden"
  />
</label>







      </div>
          <pre className="bg-gray-100 rounded-xl shadow p-1 mb-8">{transcript}</pre>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-4">
                <video src={`http://localhost:5050${video.videoUrl}`} controls className="w-full rounded" />
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded on {new Date(video.uploadedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>


    </div>
  );
}
