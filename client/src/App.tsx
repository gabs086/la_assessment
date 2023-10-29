//* Libraries
import { useState } from 'react';

//* Components
import DutyList from '@/components/ui/DutyList';
import AddDutyModal from '@/components/ui/AddDutyModal';
import EditDutyModal from '@/components/ui/EditDutyModal';
import Header from '@/components/ui/Header';

import Container from '@/components/widgets/Container';

import { useModal } from '@/hooks/useModal';

interface EditValues {
  id?: number;
  name?: string;
}

function App() {
  const addModal = useModal(false);
  const editModal = useModal(false);
  const [editValues, setEditValues] = useState<EditValues>({});

  return (
    <>
      {/* Modal for Adding  */}
      <AddDutyModal addModal={addModal} />
      {/* Modal for Edit  */}
      <EditDutyModal editModal={editModal} editValues={editValues} />

      <Container>
        <Header addModal={addModal} />
        <DutyList setEditValues={setEditValues} setOpenEditModal={editModal.setTrue} />
      </Container>
    </>
  );
}

export default App;
