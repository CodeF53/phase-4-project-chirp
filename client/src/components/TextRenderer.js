export function TextRenderer({value, className}) {
  return <div className={`${className} col`}>
    {value.split("\n").map((line,i)=><p className="textLine" key={i}>{line}</p>)}
  </div>
}
