import { Grid } from "antd";
import BackLight from "../../components/BackLight";
import Container from "../../components/Container";

const { useBreakpoint } = Grid;

export default function Main() {

    // Breakpoints de tamanho para responsividade
    const screens = useBreakpoint();

    return (
        <>
            <BackLight />
            <div
                style={{
                    padding: screens.md ? 60 : 0,
                }}
            >
                <Container />
            </div>
        </>
    )
}