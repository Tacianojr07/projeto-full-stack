import { Button as ButtomNativeBase, Text } from "native-base"

interface Props {
    title: string
}

export function Button({title}:Props) {
    return(
         <ButtomNativeBase>
            <Text>{title}</Text>
         </ButtomNativeBase>
    )
}