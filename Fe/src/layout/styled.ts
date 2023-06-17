import styled from 'styled-components';
import { Layout } from 'antd';

const logo =  require('src/assets/images/logo.svg');

export const StyledLayout = styled(Layout)`
    .demo-logo {
        background: url(${logo});
        background-size: 100%;
    }
`;