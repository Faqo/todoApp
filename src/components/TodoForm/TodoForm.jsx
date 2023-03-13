import { Button, TextField, Grid } from '@mui/material';
import { useForm } from 'Hooks';
import { useDispatch } from 'react-redux';
import { startAddingTodo } from 'store/slices/todos';

export const TodoForm = () => {

    const { todo, onInputChange } = useForm({ todo: ''})

    const dispatch = useDispatch();   

    const onSubmit = (e) => {
        e.preventDefault();
        if(todo) dispatch(startAddingTodo({
            label: todo
        }));
    }

    return (
        <form onSubmit={onSubmit}> 
            <Grid container
                spacing={0.5}
                justifyContent="center"
                alignItems="center"
                padding={'10px 0'}
            >
                <Grid item >
                    <TextField
                        sx={{ width: 300 }}
                        size="small"
                        variant="outlined"
                        placeholder="Enter new to do"
                        name='todo'
                        onChange={onInputChange}
                        value={todo}
                    />
                </Grid>
                <Grid item >
                    <Button
                        size='large'
                        type="submit"
                        variant="contained"
                    >
                        ADD TO DO
                    </Button>
                </Grid>
            </Grid>
        </form>

    )
}