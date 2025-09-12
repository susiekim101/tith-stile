import Header from "./Header/Header";
import Title from "./Title/Title";
import Form from "./Form/Form";

const Intake = ({ }) => {

    return (
        <div>
            <Header intake={true}/>
            <Title/>
            <Form/>
        </div>
    );
}

export default Intake;