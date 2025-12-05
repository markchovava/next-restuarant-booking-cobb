
interface PropsInterface{
    title?: string,
    alignCss?: string
}

export default function H1({ title, alignCss='text-left' }: PropsInterface) {
  return (
    <p className={`${alignCss} text-[2.5rem] font-black`}>
      {title}
    </p>
  )
}
