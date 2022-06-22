import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { useAppSelector, useAppDispatch } from '~/hooks/hooks';
import { board as boardActions } from '~/store/actions';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { BoardCreatingForm } from './components/board-creating-form';
import { FormattedMessage } from '../common/common';
import styles from './styles.module.scss';
import bucketImg from '~/assets/images/delete-bucket.svg';
import plusImg from '~/assets/images/plus.svg';
import { useForm } from 'react-hook-form';
import { SearchData, SearchResultsMain } from '~/common/types/types';

export const Main: FC = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [choosedId, setChoosedId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setsearchResults] = useState<SearchResultsMain[]>([]);
  const { register, handleSubmit } = useForm<SearchData>();

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, []);

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    dispatch(boardActions.removeBoard(choosedId));
  };

  const handleCreateBoard = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSearch = async (payload: SearchData): Promise<void> => {
    const { targetName } = payload;
    if (targetName) {
      const results: SearchResultsMain[] = [];
      boards.map((el) => {
        const { title, id } = el;
        const regExp = new RegExp(targetName, 'i');
        if (regExp.test(title)) {
          results.push({ title: title, id: id });
        }
      });
      setsearchResults(results);
    } else {
      setsearchResults([]);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles['outer-wrapper']}>
        <form className={styles['main-header']} onChange={handleSubmit(handleSearch)}>
          <FormattedMessage className={styles.title} as="h1" message={'main.title'} />
          <div className={styles['search-container']}>
            <input type="text" {...register('targetName')} />
            <ul className={styles['search-results']}>
              {searchResults.map(({ title, id }) => {
                const handleClick = (): void => {
                  navigate(`${AppRoute.BOARD}/${id}`);
                };
                return (
                  <li className={styles['search-results-item']} onClick={handleClick} >
                    <span>{title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
        <ul className={styles.wrapper}>
          <ConfirmationModal
            isOpen={Boolean(choosedId)}
            onClose={handleCloseConfirmation}
            onConfirm={handleConfirm}
            message={'modals.confirmation.deleteBoard'}
          />
          {boards.map(({ id, title, description }) => {
            const handleDelete = (e: React.MouseEvent): void => {
              setChoosedId(id);
              e.stopPropagation();
            };
            const handleClick = (): void => {
              navigate(`${AppRoute.BOARD}/${id}`);
            };
            return (
              <li
                className={styles['board-item']}
                onClick={handleClick}
                key={id}
              >
                <div className={styles['board-top']}>
                  <h3 className={styles['board-title']}>{title}</h3>
                  <img
                    className={styles['board-img']}
                    src={bucketImg}
                    onClick={handleDelete}
                    alt="delete"
                  />
                </div>
                <div className={styles['board-bottom']}>
                  <p className={styles['board-text']}>{description}</p>
                </div>
              </li>
            );
          })}
          <li className={styles['add-board-board']} onClick={handleCreateBoard}>
            <img className={styles['plus-img']} src={plusImg} alt="add board" />
          </li>
        </ul>
      </div>
      <BoardCreatingForm isOpen={isOpen} onClose={handleCreateBoard} />
    </main>
  );
};
