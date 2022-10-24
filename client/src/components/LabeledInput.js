export function LabeledInput({label, name, type, value, onChange, step, min, max}) {
    return <div className="labeled_input">
      <label htmlFor={name}>{label}</label>
      <div className="spacer"/>
      <textarea name={name} type={type} value={value} onChange={onChange} step={step} min={min} max={max}/>
    </div>
  }