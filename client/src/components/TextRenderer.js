export function TextRenderer({value, className}) {
  return <div className={`${className} col`}>
    {value.split("\n").map(line=><p className="textLine">{line}</p>)}
  </div>
}