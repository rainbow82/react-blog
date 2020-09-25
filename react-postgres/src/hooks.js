export default useFetchBlogs = () => {
    const [status, setStatus] = useState('idle');
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setStatus('fetching');
            const response = await fetch(
                `http://localhost:3001`
            );
            const data = await response.json();
            setBlogs(data);
            setStatus('fetched');
        };

        fetchBlogs();
    });

    return { status, blogs };
};
