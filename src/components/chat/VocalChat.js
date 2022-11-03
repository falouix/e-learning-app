import { ReactMic } from 'react-mic';
import React from 'react'
import micIcon from '../../assets/mic.svg'
export class VocalChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
  }
 
  startRecording = () => {
    this.setState({ record: true });
  }
 
  stopRecording = () => {
    this.setState({ record: false });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
 
  render() {
    return (
      <div>
        <ReactMic
         record={this.state.record}       // defaults -> false.  Set to true to begin recording
        pause={this.state.pause}        // defaults -> false (available in React-Mic-Gold)
        visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
        className="sound-wave"     // provide css class name
        onStop={this.onStop}    // required - called when audio stops recording
        onData={this.onData}   // optional - called when chunk of audio data is available
        strokeColor="#000000" // sinewave or frequency bar color
        backgroundColor="#FF4081" // background color
        mimeType="audio/webm"     // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
        echoCancellation={true} // defaults -> false
        autoGainControl={true}  // defaults -> false
        noiseSuppression={true} // defaults -> false
        channelCount={2}     // defaults -> 2 (stereo).  Specify 1 for mono.
        bitRate={256000}          // defaults -> 128000 (128kbps).  React-Mic-Gold only.
        sampleRate={96000}        // defaults -> 44100 (44.1 kHz).  It accepts values only in range: 22050 to 96000 (available in React-Mic-Gold)
        timeSlice={3000}         
          />
           <div className="icon send micIcon" onClick={this.startRecording}>
           <img src={micIcon} alt="" />
           
        <button onClick={this.stopRecording} type="button">Stop</button>
           </div>
      </div>
    );
  }
}
export default VocalChat;