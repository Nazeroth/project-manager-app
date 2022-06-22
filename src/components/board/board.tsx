import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  column as columnActions,
  board as boardActions,
  user as userActions,
} from '~/store/actions';
import { DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import {
  FullBoardDto,
  UserDto,
} from '~/common/types/types';
import { MainButton } from '../common/common';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import { FilterContainer } from './components/filter-container/filter-container';
import { ColumnList } from './components/column-list';
import styles from './styles.module.scss';
import { SearchBar } from './components/search-bar/search-bar';

export const Board: FC = () => {
  const { id: boardId } = useParams();
  const { board, status, usersMap } = useAppSelector((state) => ({
    board: state.boards.currentBoard,
    status: state.boards.currentBoardStatus,
    usersMap: state.users.registeredUsers.reduce((result, user) => {
      return result.set(user.id, user);
    }, new Map<string, UserDto>()),
  }));
  const dispatch = useAppDispatch();
  const [choosedId, setChoosedId] = useState('');
  const [onlyMyTasks, setOnlyMyTasks] = useState(false);
  const [columns, setColumns] = useState(board?.columns || []);

  const handleChangeFilter = (): void => {
    setOnlyMyTasks(!onlyMyTasks);
  };

  const updateColumns = async (): Promise<void> => {
    if (boardId) {
      const data = await dispatch(boardActions.getById(boardId)).unwrap();
      const currentBoard = data as FullBoardDto;

      setColumns(currentBoard.columns);
    }
  };

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, []);

  useEffect(() => {
    updateColumns();
  }, []);

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    if (boardId && Boolean(choosedId)) {
      dispatch(columnActions.removeColumn({ boardId, columnId: choosedId }));
    }
  };

  if (status === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!boardId || !board || !usersMap.size) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <ConfirmationModal
        message={'modals.confirmation.deleteColumn'}
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <div className={styles['board-header']}>
        <div className={styles['board-header-top']}>
          <MainButton />
          <SearchBar updateColumns={updateColumns} />
        </div>
        <div className={styles['board-header-bottom']}>
          <h1 className={styles['board-title']}>{board.title}</h1>
          <FilterContainer
            handleChangeFilter={handleChangeFilter}
            filter={{ onlyMyTasks }}
          />
        </div>
      </div>
      <ColumnList
        columns={columns}
        setColumns={setColumns}
        usersMap={usersMap}
        filter={{ onlyMyTasks }}
        boardId={board.id}
        updateColumns={updateColumns}
      />
    </main>
  );
};
