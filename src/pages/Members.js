import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Stack } from '@chakra-ui/react';

import ActivitiesFeed from '../components/activitiesFeed';
import MemberCard from '../components/memberCard';
import MemberInfo from '../components/memberInfo';
import ContentBox from '../components/ContentBox';
import TextBox from '../components/TextBox';
import { useDaoMember } from '../contexts/DaoMemberContext';
import { useMetaData } from '../contexts/MetaDataContext';
import { getMemberActivites, getMembersActivites } from '../utils/activities';
import { getCopy } from '../utils/metadata';
import MembersChart from '../components/membersChart';
import ListSort from '../components/listSort';
import { membersSortOptions } from '../utils/memberContent';

const Members = ({ members, activities }) => {
  const { daoMember } = useDaoMember();
  const { daoid, daochain } = useParams();
  const [selectedMember, setSelectedMember] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { customTerms } = useMetaData();
  const [listMembers, setListMembers] = useState(members);
  const [sort, setSort] = useState();

  const selectMember = (member) => {
    if (selectedMember == null) {
      setSelectedMember(member);
    } else {
      if (selectedMember.memberAddress === member.memberAddress) {
        setSelectedMember(null);
      } else {
        setSelectedMember(member);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrolledStyle = {
    position: 'sticky',
    top: 20,
  };

  useEffect(() => {
    if (members && members.length > 0) {
      sortMembers();
    }
  }, [members, sort]);

  const sortMembers = () => {
    const sortedMembers = members;

    if (sort) {
      sortedMembers.sort((a, b) => {
        if (sort.value === 'joinDateAsc') {
          return +a.createdAt - +b.createdAt;
        } else if (sort.value === 'joinDateDesc') {
          return +b.createdAt - +a.createdAt;
        } else {
          return +b[sort.value] - +a[sort.value];
        }
      });
    }

    setListMembers([...sortedMembers]);
  };

  return (
    <>
      <ListSort sort={sort} setSort={setSort} options={membersSortOptions} />
      <Flex wrap='wrap'>
        <Box
          w={['100%', null, null, null, '60%']}
          pr={[0, null, null, null, 6]}
          pb={6}
        >
          <ContentBox mt={6}>
            <Flex>
              <TextBox w='43%' size='xs'>
                {getCopy(customTerms, 'member')}
              </TextBox>
              <TextBox w='15%' size='xs'>
                Shares
              </TextBox>
              <TextBox w='15%' size='xs'>
                Loot
              </TextBox>
              <TextBox size='xs'>Join Date</TextBox>
            </Flex>
            {listMembers &&
              listMembers?.map((member) => {
                return (
                  <MemberCard
                    key={member.id}
                    member={member}
                    selectMember={selectMember}
                    selectedMember={selectedMember}
                  />
                );
              })}
          </ContentBox>
        </Box>
        <Box w={['100%', null, null, null, '40%']}>
          <Stack style={scrolled ? scrolledStyle : null} spacing={4}>
            <Box>
              {selectedMember ? (
                <MemberInfo member={selectedMember} />
              ) : (
                <>
                  {daoMember && (
                    <Flex justify='space-between' mb={5}>
                      <TextBox size='xs'>Snapshot</TextBox>
                      <TextBox
                        as={Link}
                        to={`/dao/${daochain}/${daoid}/profile/${daoMember.memberAddress}`}
                        color='inherit'
                        size='xs'
                      >
                        View My Profile
                      </TextBox>
                    </Flex>
                  )}
                  <MembersChart />
                </>
              )}
            </Box>

            {selectedMember ? (
              <ActivitiesFeed
                limit={2}
                activities={activities}
                hydrateFn={getMemberActivites(selectedMember.memberAddress)}
              />
            ) : daoMember ? (
              <ActivitiesFeed
                limit={2}
                activities={activities}
                hydrateFn={getMembersActivites}
              />
            ) : null}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Members;