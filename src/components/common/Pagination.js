import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "styled-components";
const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
    gap: 8px;
    margin-top: 60px;
`;

const PaginationBtnBox = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dfe3e8;
    box-sizing: border-box;
    border-radius: 4px;
`;

const Pagination = () => {
    return (
        <PaginationWrapper>
            <PaginationBtnBox>
                <NavigateBeforeIcon />
            </PaginationBtnBox>
            <PaginationBtnBox>1</PaginationBtnBox>
            <PaginationBtnBox>2</PaginationBtnBox>
            <PaginationBtnBox>3</PaginationBtnBox>
            <PaginationBtnBox>4</PaginationBtnBox>
            <PaginationBtnBox>5</PaginationBtnBox>
            <PaginationBtnBox>
                <NavigateNextIcon />
            </PaginationBtnBox>
        </PaginationWrapper>
    );
};

export default Pagination;
