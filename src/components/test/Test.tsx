import React from 'react'
import { SiGithub } from 'react-icons/si';
import { TheIcon } from '../Shared/TheIcon';
import gql from "graphql-tag";
import { useGitGQLQuery } from '../people/utils/gql';



interface TestProps {
token:string
}
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const GET_COUNTRY = gql`
  query ($code: ID!) {
    country(code: $code) {
      name
    }
  }
`;
const STATUS = gql`

    query {
      viewer {
        login

      }
    }
  
`;
export const Test: React.FC<TestProps> = ({token}) => {

const { data, isLoading, error } = useGitGQLQuery(["countries"],token ,STATUS,{});
console.log("gql response",data)
return (
  <div className="w-full h-full flex-center border border-white">
    <TheIcon Icon={SiGithub} size={"70"} color={"green"} />
  </div>
);
}
