using System.Collections;
using System.Collections.Generic;
using UnityEngine.Events;
using UnityEngine;
using UnityEngine.XR;
using UnityEngine.UI;

public class Player : MonoBehaviour
{
    public float forcaPulo;
    public float velocidadeMaxima;
    
    public int lives;
    public int rings;

    public Text TextLives;
    public Text TextRings;

    public bool isGrounded;

    public bool canFly;
    
    public bool inWater;
    public GameObject lastCheckpoint;
    void Start()
    {
        TextLives.text = lives.ToString();
        TextRings.text = rings.ToString();
    }

    void Update()
    {
        Rigidbody2D rigidbody =  GetComponent<Rigidbody2D>();

        float movimento = Input.GetAxis("Horizontal");

        rigidbody.velocity = new Vector2(movimento*velocidadeMaxima,rigidbody.velocity.y);

        if(movimento < 0)
        {
            GetComponent<SpriteRenderer>().flipX = true;
        }
        else if (movimento > 0)
        {
            GetComponent<SpriteRenderer>().flipX = false;
        }


        if(movimento > 0 || movimento < 0)
        {
            GetComponent<Animator>().SetBool("Walking", true);
        }
        else
        {
            GetComponent<Animator>().SetBool("Walking", false);
        }

        if (!inWater)
        {
            if (Input.GetKey(KeyCode.Space))
            {
                if (isGrounded)
                {
                    rigidbody.AddForce(new Vector2(0, forcaPulo));
                    GetComponent<AudioSource>().Play();
                    canFly = false;
                }
                else
                {
                    canFly = true;
                }
            }

            if (canFly && Input.GetKey(KeyCode.Space))
            {
                GetComponent<Animator>().SetBool("flying", true);
                rigidbody.velocity = new Vector2(rigidbody.velocity.x, -0.5f);
            }
            else
            {
                GetComponent<Animator>().SetBool("flying", false);
            }

            if (isGrounded)
            {
                GetComponent<Animator>().SetBool("Jumping", false);
            }
            else
            {
                GetComponent<Animator>().SetBool("Jumping", true);
            }
        }
        else
        {
            if (Input.GetKey(KeyCode.UpArrow))
            {
                rigidbody.AddForce(new Vector2(0, 6f * Time.deltaTime), ForceMode2D.Impulse);
            }
            if (Input.GetKey(KeyCode.DownArrow))
            {
                rigidbody.AddForce(new Vector2(0, -6f * Time.deltaTime), ForceMode2D.Impulse);
            }
            rigidbody.AddForce(new Vector2(0, 10f * Time.deltaTime), ForceMode2D.Impulse);
        }
        GetComponent<Animator>().SetBool("swimming", inWater);
        if (Input.GetKey(KeyCode.LeftControl))
        {
            GetComponent<Animator>().SetTrigger("hammer");
            Collider2D[] colliders = new Collider2D[3];
            transform.Find("HammerArea").gameObject.GetComponent<Collider2D>()
                .OverlapCollider(new ContactFilter2D(), colliders);
            for (int i = 0; i < colliders.Length; i++)
            {
                if (colliders[i]!=null && colliders[i].gameObject.CompareTag("Criaturas"))
                {
                    Destroy(colliders[i].gameObject);
                } 
            }
        }
    }

    private void OnTriggerEnter2D(Collider2D collision2D)
    {
        if (collision2D.gameObject.CompareTag("Water"))
        {
            inWater = true;
        }
        if (collision2D.gameObject.CompareTag("Joia"))
        {
            
            Destroy(collision2D.gameObject);
            rings++;
            TextRings.text = rings.ToString();
            
        }
        if (collision2D.gameObject.CompareTag("checkpoint"))
        {
            lastCheckpoint = collision2D.gameObject;
        }
    }

    private void OnTriggerExit2D(Collider2D collision2D)
    {
        if (collision2D.gameObject.CompareTag("Water"))
        {
            inWater = false;
        }
    }
    void OnCollisionEnter2D(Collision2D collision2D)
    {
        if (collision2D.gameObject.CompareTag("Criaturas"))
        {
            lives--;
            TextLives.text = lives.ToString();
            if (lives == 0)
            {
                transform.position = lastCheckpoint.transform.position;
            }
        }
        
        if (collision2D.gameObject.CompareTag("Plataformas"))
        {
            isGrounded = true;
        }
        
        
        if (collision2D.gameObject.CompareTag("Trampulim"))
        {
            GetComponent<Rigidbody2D>().velocity = new Vector2(0f,10f);
        }
    }

    void OnCollisionExit2D(Collision2D collision2D)
    {
        if (collision2D.gameObject.CompareTag("Plataformas"))
        {
            isGrounded = false;
        }
    }
}
