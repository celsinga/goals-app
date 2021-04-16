import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import styles from './index.css';
import Paper from '@material-ui/core/Paper';
import { useAppDispatch } from '../../store';
import { activeGoalsSelector } from '../../slices/goals';
import { useHistory } from 'react-router-dom';
import pluralize from 'pluralize';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import { complete } from '../../slices/goals';
import AddTask from '../AddTask';
import TaskList from '../TaskList';
import EditIcon from '@material-ui/icons/Edit';


export default function Goal() {
  const dispatch = useAppDispatch();
  const activeGoals = useSelector(activeGoalsSelector);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const goal = activeGoals.find((v) => v.id === parseInt(id));
  const currentDate = new Date;

  if (!goal) return null;

  const monthsRemaining = (new Date(goal.goal.deadline * 1000).getMonth()) - (currentDate.getMonth());

  async function handleCompleteClick() {
    await dispatch(complete(goal!.id));
    history.push('/');
  };

  return (
    <div>
      <Paper className={styles.goalPaper}>
        <div className={styles.header}>
          <div>
            <Typography className={styles.goalId} color='textSecondary'>
              {`Goal #${goal.id}`}
            </Typography>
            <div contentEditable="true"
              suppressContentEditableWarning
              >
              <Typography>
                {goal.goal.description}
              </Typography>
            </div>

            <div style={{display: 'flex'}}>
              {currentDate.getMonth() === new Date(goal.goal.deadline * 1000).getMonth() ? (
                <Typography style={{ color: '#eb4034', fontSize: '1em' }}>
                  {(new Date(goal.goal.deadline * 1000).getDate()) - (currentDate.getDate())} days remaining
                </Typography>
              ) : (
                <Typography style={{color: '#eb4034'}}>
                  {monthsRemaining} {pluralize('month', monthsRemaining)} remaining
                </Typography>
              )}
              <EditIcon style={{color: '#eb4034', fontSize: '1.2em', marginLeft: '7px'}} />
            </div>
          </div>

          <div>
            <IconButton onClick={handleCompleteClick}>
              <DoneOutlineOutlinedIcon />
            </IconButton>
          </div>

        </div>

        <TaskList goalId={goal.id} />
        <AddTask goalId={goal.id} />
            
      </Paper>
    </div>
  );
}
