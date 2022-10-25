import { ChirpChain } from "./Chirp";
import { ChirpEditor } from "./ChirpEditor";
import {ReactComponent as CloseSvg} from '../assets/close.svg';


export function ChirpEditorModal({reply_chirp_id, exit, current_user, addChirp}) {
  return <div className="modalOverlay" onClick={exit}>
    <div className="modal col" onClick={e=>e.stopPropagation()}>
      <button className="closeModal" aria-label="close" onClick={exit}><CloseSvg/></button>
      {reply_chirp_id?<ChirpChain current_user={current_user} id={reply_chirp_id} disable_reply={true} noOutline={true}/>:null}
      <ChirpEditor current_user={current_user} placeholder={"Chirp your reply"} reply_chirp_id={reply_chirp_id} addChirp={addChirp} onSuccess={exit}/>
    </div>
  </div>
}