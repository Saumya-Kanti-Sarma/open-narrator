import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { setHasText } from "../../store/AudioBtnSlice";
import "./TextArea.css"

const TextArea = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <textarea
      name="input-txt" id="input-txt"
      placeholder='Type or paste your text here...'
      onChange={(event) => dispatch(setHasText(event.target.value.trim().length > 0))}
    />
  )
}

export default TextArea