import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Box,
} from '@chakra-ui/react';
import { rgba } from 'polished';

import MinionSimpleProposalForm from '../forms/minionSimpleProposal';
import SuperfluidMinionProposalForm from '../forms/superfluidMinionProposal';
import TransmutationProposal from '../forms/transmutationProposal';
import { getTerm } from '../utils/metadata';
import { useMetaData } from '../contexts/MetaDataContext';
import { useOverlay } from '../contexts/OverlayContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import LootGrabForm from '../forms/lootGrab';
import ProposalForm from '../formBuilder/proposalForm';
import { PROPOSAL_FORMS } from '../staticElements/proposalFormData';

const ProposalFormModal = ({ proposalType }) => {
  const [, setLoading] = useState(false);
  const [proposalForm, setProposalForm] = useState(null);
  const { customTerms } = useMetaData();
  const { theme } = useCustomTheme();
  const { proposalModal, setProposalModal } = useOverlay();

  const proposalForms = {
    signal: {
      heading: 'Signal That!',
      form: <ProposalForm {...PROPOSAL_FORMS.SIGNAL} />,
    },
    member: {
      heading: `New ${getTerm(customTerms, 'member')} ${getTerm(
        customTerms,
        'proposal',
      )}`,
      form: <ProposalForm {...PROPOSAL_FORMS.MEMBER} />,
    },
    funding: {
      heading: `New Funding ${getTerm(customTerms, 'proposal')}`,
      form: <ProposalForm {...PROPOSAL_FORMS.FUNDING} />,
    },
    //  Are we using lootgrab anymore?
    lootgrab: {
      type: `New ${getTerm(customTerms, 'proposal')}`,
      heading: `New Loot Grab ${getTerm(customTerms, 'proposal')}`,
      subline: 'Submit a loot grab proposal here.',
      form: <LootGrabForm />,
    },
    whitelist: {
      heading: `New Whitelist ${getTerm(customTerms, 'proposal')}`,
      form: <ProposalForm {...PROPOSAL_FORMS.TOKEN} />,
    },
    guildkick: {
      heading: `New GuildKick ${getTerm(customTerms, 'proposal')}`,
      form: <ProposalForm {...PROPOSAL_FORMS.GUILDKICK} />,
    },
    trade: {
      heading: `New Trade ${getTerm(customTerms, 'proposal')}`,
      form: <ProposalForm {...PROPOSAL_FORMS.TRADE} />,
    },
    minion: {
      type: `New ${getTerm(customTerms, 'proposal')}`,
      heading: `New Minion ${getTerm(customTerms, 'proposal')}`,
      subline: 'Submit a Minion proposal here.',
      form: <MinionSimpleProposalForm />,
    },
    superfluidMinion: {
      type: `New ${getTerm(customTerms, 'proposal')}`,
      heading: `New Superfluid Minion ${getTerm(customTerms, 'proposal')}`,
      subline: 'Submit a Superfluid Minion proposal here.',
      form: <SuperfluidMinionProposalForm />,
    },
    transmutation: {
      type: `New ${getTerm(customTerms, 'proposal')}`,
      heading: `New Transmutation ${getTerm(customTerms, 'proposal')}`,
      subline: 'Submit a Transmutation proposal here.',
      form: <TransmutationProposal />,
    },
  };

  useEffect(() => {
    if (proposalType) {
      setProposalForm(proposalForms[proposalType]);
    }
  }, [proposalType]);

  const handleClose = () => {
    setLoading(false);
    setProposalModal(false);
  };

  return (
    <Modal
      isOpen={proposalModal}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay
        bgColor={rgba(theme.colors.background[500], 0.8)}
        style={{ backdropFilter: 'blur(6px)' }}
      />
      <ModalContent
        rounded='lg'
        bg='blackAlpha.600'
        borderWidth='1px'
        borderColor='whiteAlpha.200'
        maxWidth='800px'
      >
        <ModalHeader>
          <Box
            fontFamily='heading'
            textTransform='uppercase'
            fontSize='xs'
            fontWeight={700}
            color='#7579C5'
            mb={4}
          >
            {proposalForm?.heading}
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{proposalForm?.form}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ProposalFormModal;
