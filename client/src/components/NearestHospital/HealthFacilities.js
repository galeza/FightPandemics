import React, { useState } from 'react';
import styled from "styled-components";
import { theme, mq } from '../../constants/theme';

import ConfirmedCases from "./ConfirmedCases";
import SearchInput from "../Input/SearchInput";
// import { SearchBar } from 'antd-mobile';

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import shareLocation from "../../assets/icons/share-my-location.svg";
import NrMap from "../../pages/NrMap";
import DescriptionCard from "../Card/DescriptionCard";

const { colors, typography } = theme;
const { xxlarge } = typography.size;


   const HealthFacilitiesData = [
       {
         id: 1,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco, Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(704) 555.0126",
         distance: "3km",
         isOpen: true
       },
       {
         id: 2,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco, Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(234) 191.5131",
         distance: "4.3km",
         isOpen: false
       },
       {
         id: 3,
         hospitalName: "United hospital",
         hospitalAddress: "9915 Saddle Dr Undefined San Fancisco, Washinton United State",
         openDate: "Open Mon - Fri 09:00 to 22:00",
         contactNo: "(704) 555.0126",
         distance: "6km",
         isOpen: false
       }
     ]


  const NearestLocationContainer = styled.div`
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: block;
      }
      @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
        display: block;
      }
  `;

  const HealthFacilities = styled.div`
      flex-basis: 55%;
      align-self: flex-start;
      padding-top: 2rem;
      overflow-Y: hidden;
      h2 {
        font-weight: bold;
        color: #282828;
      }
      div {
        margin-right: 2rem;
        @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
          margin-right: 0;
        }
      }

  `;

  const MapContainer = styled.div`
      /* align-self: flex-start; */
      flex: 1;
      div {
        align-self: flex-start;
        height: auto;
      }
  `;

  const ShareLocationContainer = styled.div`
      padding: 6rem;
      border-radius: 2px;
      margin-top: 4rem;
      border: 1px solid rgba(0, 0, 0, 0.12);
      background-color: ${colors.white};
      h1 {
        font-size: ${xxlarge};
        color: #282828;
        text-align: center;
        padding: 0 5rem;
        font-weight: bold;
      }
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        padding: 0;
        min-height: 100vh;
        margin-top: 0;
        padding-top: 4rem;
        border: 0;
        h1 {
          padding: 0 2rem;
        }
      }
  `;

  const SearchBarContainer = styled.div`
      margin: 0 9rem;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        margin:0 2rem;
      }
  `;


  const ShareLocation = styled.div`
     padding: 1rem;
     cursor: pointer;
     color: ${colors.primary};
     @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
       text-align: center;
     }
     &:hover {
       color: ${colors.primary}
     }
  `;

  const CasesContainer = styled.div`
      display: none;
      @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
        display: block;
      }
  `;

  const shareIconStyles = {
    margin: "0 auto",
    color: "#425AF2",
    width: "11px",
    marginRight: ".8rem"
  }

const NearestHealthFacilities = props => {

  const [searchValue, setSearchValue] = useState('');

  const onSearchInputChange = (value) => {
    setSearchValue(value);
    console.log(searchValue);

  }
  const clearSearch = () => {
    setSearchValue('');
  }

  const [userCoords, setCoords] = useState(null);

  const userLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position, error) => {
        if(error) {
          // change error message
          alert("Sorry we could not get your location. Your browser may not be compatible")
        }
        setCoords(position.coords)

      });
    } else {
      alert("Browser not supported!")
    }
  }


  return (
    <div>
    {userCoords ? (
        <NearestLocationContainer>
         <CasesContainer>
          <ConfirmedCases />
         </CasesContainer>
          <HealthFacilities>
             <h2>Your nearest health facilities</h2>

             {HealthFacilitiesData.map(data => (
               <DescriptionCard
                 key={data.id}
                 hospitalName={data.hospitalName}
                 hospitalAddress={data.hospitalAddress}
                 openDate={data.openDate}
                 contactNo={data.contactNo}
                 distance={data.distance}
                 isOpen={data.isOpen}
               />
             ))}

          </HealthFacilities>
            <MapContainer>
               <NrMap />
            </MapContainer>
        </NearestLocationContainer>
    ) : (
        <ShareLocationContainer>
           <h1>Share your location if you want to
           see your nearest health facilities</h1>
           <SearchBarContainer>
             <SearchInput
               value={searchValue}
               placeholder="Enter Address, Zip Code, or City"
               onClear={clearSearch}
               onChange={onSearchInputChange}
              />
              <ShareLocation onClick={userLocation}>
                <SvgIcon src={shareLocation} style={shareIconStyles} />
                Share My Location
              </ShareLocation>
            </SearchBarContainer>
        </ShareLocationContainer>
    )}

    </div>
  )
}

export default NearestHealthFacilities;
