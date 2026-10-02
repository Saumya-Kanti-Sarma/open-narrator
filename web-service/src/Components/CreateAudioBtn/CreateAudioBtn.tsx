import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import "./CreateAudioBtn.css"

const CreateAudioBtn = () => {
  const hasText = useSelector((state: RootState) => state.audioBtn.hasText);

  return (
    <button
      id="CreateAudioBtn"
      className={hasText ? "is-visible" : ""}
      disabled={!hasText}
    >
      Generate Audio
    </button>
  )
}

export default CreateAudioBtn