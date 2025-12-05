
interface PropsInterface {
    name?: string,
    css?: string
}

export default function LabelPrimary({css, name}: PropsInterface) {
  return (
    <div className="flex items-center justify-start gap-1">
        <span className={`w-4 h-4 ${css} rounded`}></span>
        <span>{name}</span>
    </div>
  )
}
